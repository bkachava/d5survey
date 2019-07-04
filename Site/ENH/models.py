from .app import db


class Rent(db.Model):
    __tablename__ = 'rent'

    id = db.Column(db.Integer, primary_key=True)
    folioviv = db.Column(db.Integer)
    tenencia = db.Column(db.Integer)
    pago_renta = db.Column(db.Integer)
    est_socio = db.Column(db.Integer)
    edad = db.Column(db.Integer)
    parentesco = db.Column(db.Integer)
    
    def __repr__(self):
        return '<Rent %r>' % (self.id)
