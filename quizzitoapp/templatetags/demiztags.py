from django import template


register = template.Library()


# Custom Filters
@register.filter(name='get_type')
def get_type(value):
    return type(value).__name__


@register.filter(name='get_by_index')
def get_by_index(list, index):
    if list:
        return list[index]
    return None


@register.filter(name='indexLoop')
def indexLoop(list, index):
    if list:
        return list[index], True
    return None, False


@register.filter(name='options')
def options(selected_opt, lookup_opt):
    selected_opt, submitted = selected_opt
    if submitted:
        return selected_opt, lookup_opt, True
    return selected_opt, lookup_opt, False


@register.filter(name='colorOptions')
def colorOptions(options, answer):
    color = 'black'
    selected_opt, lookup_opt, submitted = options
    if submitted: 
        if lookup_opt == answer:
            color = 'green'
    if selected_opt:
        if lookup_opt == selected_opt:
            if lookup_opt != answer:
                color = 'red'
    return color


@register.filter(name='checkQuizSubmit')
def checkQuizSubmit(questions_taken):
    if questions_taken:
        return True
    return False



@register.filter(name='trim')
def trim(text):
    return text.strip()


@register.filter(name='loop')
def loop(start: int, stop: int=0):
    return range(start, stop) if stop else range(start)


@register.filter(name='make_a_list')
def make_a_list(values: str):
    values = values.split(',')
    return values


@register.filter(name='lower')
def lower(value: str):
    return value.lower()