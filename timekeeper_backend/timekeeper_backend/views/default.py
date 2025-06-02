from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError

from ..models.mymodel import MyModel

@view_config(route_name='home', renderer='json')
def my_view(request):
    try:
        result = request.dbsession.query(MyModel).filter(MyModel.name == 'one').first()
        if result:
            return {
                'message': 'Data ditemukan',
                'data': {
                    'id': result.id,
                    'name': result.name
                }
            }
        else:
            return {
                'message': 'Data tidak ditemukan',
                'data': None
            }
    except SQLAlchemyError as e:
        request.response.status = 500
        return {
            'error': 'Database error',
            'message': str(e)
        }
