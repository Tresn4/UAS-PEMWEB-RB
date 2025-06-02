from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from ..models.meta import DBSession
from ..models.activity import Activity
from ..schemas.activity import ActivitySchema
from ..utils.logger import logger

activity_schema = ActivitySchema()

@view_config(route_name='activities', request_method='GET', renderer='json')
def list_activities(request):
    session = DBSession()
    try:
        activities = session.query(Activity).all()
        logger.info(f"Mengambil {len(activities)} aktivitas")
        return {'activities': activity_schema.dump(activities, many=True)}
    except Exception as e:
        logger.error(f"Error mengambil aktivitas: {str(e)}")
        return HTTPBadRequest(detail=str(e))

@view_config(route_name='activities', request_method='POST', renderer='json')
def create_activity(request):
    session = DBSession()
    try:
        # Validasi input
        data = activity_schema.load(request.json_body)
        logger.info(f"Mencoba membuat aktivitas baru: {data['name']}")
        
        activity = Activity(**data)
        session.add(activity)
        session.flush()
        
        logger.info(f"Aktivitas berhasil dibuat: {activity.id} - {activity.name}")
        return activity_schema.dump(activity)
    except Exception as e:
        logger.error(f"Error saat membuat aktivitas: {str(e)}")
        session.rollback()
        return HTTPBadRequest(detail=str(e))

@view_config(route_name='activity_detail', request_method='GET', renderer='json')
def get_activity(request):
    session = DBSession()
    id = request.matchdict['id']
    try:
        activity = session.query(Activity).get(id)
        if not activity:
            logger.warning(f"Aktivitas dengan id {id} tidak ditemukan")
            return HTTPNotFound()
        logger.info(f"Mengambil aktivitas: {activity.id} - {activity.name}")
        return activity_schema.dump(activity)
    except Exception as e:
        logger.error(f"Error mengambil aktivitas {id}: {str(e)}")
        return HTTPBadRequest(detail=str(e))

@view_config(route_name='activity_detail', request_method='PUT', renderer='json')
def update_activity(request):
    session = DBSession()
    id = request.matchdict['id']
    try:
        activity = session.query(Activity).get(id)
        if not activity:
            logger.warning(f"Aktivitas dengan id {id} tidak ditemukan")
            return HTTPNotFound()

        # Validasi input
        data = activity_schema.load(request.json_body, partial=True)
        logger.info(f"Mencoba update aktivitas: {id}")
        
        for key, value in data.items():
            setattr(activity, key, value)
        
        session.flush()
        logger.info(f"Aktivitas berhasil diupdate: {activity.id} - {activity.name}")
        return activity_schema.dump(activity)
    except Exception as e:
        logger.error(f"Error update aktivitas {id}: {str(e)}")
        session.rollback()
        return HTTPBadRequest(detail=str(e))

@view_config(route_name='activity_detail', request_method='DELETE', renderer='json')
def delete_activity(request):
    session = DBSession()
    id = request.matchdict['id']
    try:
        activity = session.query(Activity).get(id)
        if not activity:
            logger.warning(f"Aktivitas dengan id {id} tidak ditemukan")
            return HTTPNotFound()
        
        logger.info(f"Menghapus aktivitas: {activity.id} - {activity.name}")
        session.delete(activity)
        session.flush()
        
        logger.info(f"Aktivitas berhasil dihapus: {id}")
        return {'message': 'Aktivitas berhasil dihapus'}
    except Exception as e:
        logger.error(f"Error menghapus aktivitas {id}: {str(e)}")
        session.rollback()
        return HTTPBadRequest(detail=str(e))