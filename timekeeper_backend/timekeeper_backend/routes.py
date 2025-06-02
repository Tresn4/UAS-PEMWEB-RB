def includeme(config):
    # Activities endpoints
    config.add_route('activities', '/api/activities')
    config.add_route('activity_detail', '/api/activities/{id}')
    
    # Categories endpoints
    config.add_route('categories', '/api/categories')
    config.add_route('category_detail', '/api/categories/{id}')