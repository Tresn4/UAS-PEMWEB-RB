from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.session import SignedCookieSessionFactory
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.events import NewRequest

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application """
    
    config = Configurator(settings=settings)
    
    # Include pyramid addons
    config.include('pyramid_tm')
    config.include('pyramid_jinja2')  # Add this line
    
    # Configure Jinja2
    config.add_jinja2_renderer('.jinja2')
    config.add_jinja2_search_path('timekeeper_backend:templates')  # Add this line
    
    # Database initialization
    config.include('timekeeper_backend.models')

    # Configure CORS
    config.add_subscriber(add_cors_headers_response_callback, NewRequest)
    
    # Add CORS OPTIONS route
    def options_view(request):
        response = Response()
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
        return response
        
    config.add_route('cors_route', '/{catch_all:.*}', request_method='OPTIONS')
    config.add_view(options_view, route_name='cors_route')
    
    # Session configuration
    session_factory = SignedCookieSessionFactory('timekeeper_secret')
    config.set_session_factory(session_factory)
    
    # Authentication and Authorization
    authn_policy = AuthTktAuthenticationPolicy('secret', hashalg='sha512')
    authz_policy = ACLAuthorizationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    
    # Include routes
    config.include('.routes')

    config.add_static_view(name='static', path='timekeeper_backend:static')

    
    # Scan views
    config.scan('.views')

    config.add_route('home', '/')
    
    return config.make_wsgi_app()

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)