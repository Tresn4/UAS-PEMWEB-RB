from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from ..models.category import Category
from ..models.meta import DBSession

@view_config(route_name='categories', request_method='GET', renderer='json')
def list_categories(request):
    categories = DBSession.query(Category).all()
    return {'categories': [{'id': c.id, 'name': c.name} for c in categories]}

@view_config(route_name='categories', request_method='POST', renderer='json')
def create_category(request):
    try:
        json_body = request.json_body
        category = Category(name=json_body['name'])
        DBSession.add(category)
        DBSession.flush()
        return {'id': category.id, 'name': category.name}
    except Exception as e:
        return HTTPBadRequest(detail=str(e))

@view_config(route_name='category_detail', request_method='GET', renderer='json')
def get_category(request):
    id = request.matchdict['id']
    category = DBSession.query(Category).get(id)
    if not category:
        return HTTPNotFound()
    return {'id': category.id, 'name': category.name}

@view_config(route_name='category_detail', request_method='PUT', renderer='json')
def update_category(request):
    id = request.matchdict['id']
    category = DBSession.query(Category).get(id)
    if not category:
        return HTTPNotFound()
    
    try:
        json_body = request.json_body
        category.name = json_body.get('name', category.name)
        DBSession.flush()
        return {'id': category.id, 'name': category.name}
    except Exception as e:
        return HTTPBadRequest(detail=str(e))

@view_config(route_name='category_detail', request_method='DELETE', renderer='json')
def delete_category(request):
    id = request.matchdict['id']
    category = DBSession.query(Category).get(id)
    if not category:
        return HTTPNotFound()
    DBSession.delete(category)
    return {'message': 'Category deleted'}