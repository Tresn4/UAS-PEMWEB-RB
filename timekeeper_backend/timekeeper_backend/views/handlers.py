from pyramid.view import view_config
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from pyramid.httpexceptions import HTTPError


@view_config(context=SQLAlchemyError, renderer='json')
def sql_error_handler(exc, request):
    request.response.status = 500
    return {
        'error': 'Database error occurred',
        'message': str(exc),
        'status': 500
    }


@view_config(context=IntegrityError, renderer='json')
def integrity_error_handler(exc, request):
    request.response.status = 400
    return {
        'error': 'Data integrity error',
        'message': str(exc),
        'status': 400
    }


@view_config(context=HTTPError, renderer='json')
def http_error_handler(exc, request):
    return {
        'error': exc.title,
        'message': exc.detail,
        'status': exc.status_code
    }


@view_config(context=Exception, renderer='json')
def generic_error_handler(exc, request):
    request.response.status = 500
    return {
        'error': 'Internal server error',
        'message': str(exc),
        'status': 500
    }
