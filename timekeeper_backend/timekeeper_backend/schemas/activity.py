from marshmallow import Schema, fields, validate

class ActivitySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    description = fields.Str(allow_none=True)
    category_id = fields.Int(required=True)
    date = fields.Date(allow_none=True)
    time = fields.Time(allow_none=True)