import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import ResearchSubmission


@csrf_exempt
@require_POST
def create_submission(request):
    if len(request.body) > 16_000:
        return JsonResponse({'error': 'La présentation est trop longue.'}, status=413)

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({'error': 'Le format de la requête est invalide.'}, status=400)

    if not isinstance(data, dict):
        return JsonResponse({'error': 'Le format de la requête est invalide.'}, status=400)

    field_limits = {
        'full_name': 160,
        'email': 254,
        'institution': 200,
        'research_title': 240,
        'research_field': 100,
        'research_summary': 5000,
        'keywords': 300,
    }
    cleaned = {}
    for field, max_length in field_limits.items():
        value = data.get(field, '')
        if not isinstance(value, str):
            return JsonResponse({'error': 'Vérifiez les informations saisies.'}, status=400)
        value = value.strip()
        if len(value) > max_length:
            return JsonResponse({'error': 'Un ou plusieurs champs dépassent la longueur autorisée.'}, status=400)
        cleaned[field] = value

    required_fields = ('full_name', 'email', 'institution', 'research_title', 'research_field', 'research_summary')
    if any(not cleaned[field] for field in required_fields) or data.get('consent') != 'true':
        return JsonResponse({'error': 'Les champs requis et le consentement sont nécessaires.'}, status=400)

    try:
        validate_email(cleaned['email'])
    except ValidationError:
        return JsonResponse({'error': 'L’adresse e-mail n’est pas valide.'}, status=400)

    submission = ResearchSubmission.objects.create(**cleaned, consent=True)
    return JsonResponse({'id': submission.pk, 'message': 'Présentation reçue.'}, status=201)
