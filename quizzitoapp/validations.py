from django.core.exceptions import ValidationError



OPT1 = None
OPT2 = None
OPT3 = None
OPT4 = None
err_msg = 'This value cannot repeat!!!'

def to_lowercase(value):
    if not value.islower():
        raise ValidationError('All characters must be lowercase!!!')


def opt1_validation(data):
    global OPT1 
    OPT1 = data.strip()
    if (OPT1 != None and OPT1 in [OPT2, OPT3, OPT4]):
        OPT1 = None
        raise ValidationError(err_msg)


def opt2_validation(data):
    global OPT2 
    OPT2 = data.strip()
    if (OPT2 != None and OPT2 in [OPT1, OPT3, OPT4]):
        OPT2 = None
        raise ValidationError(err_msg)


def opt3_validation(data):
    global OPT3 
    OPT3 = data.strip()
    if (OPT3 != None and OPT3 in [OPT2, OPT1, OPT4]):
        OPT3 = None
        raise ValidationError(err_msg)
    
    
def opt4_validation(data):
    global OPT4 
    OPT4 = data.strip()
    if (OPT4 != None and OPT4 in [OPT2, OPT3, OPT1]):
        OPT4 = None
        raise ValidationError(err_msg)

## Demiz Functions end here