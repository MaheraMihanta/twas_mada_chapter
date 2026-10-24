from django.contrib import admin

from .models import ResearchSubmission


@admin.register(ResearchSubmission)
class ResearchSubmissionAdmin(admin.ModelAdmin):
    list_display = ('research_title', 'full_name', 'institution', 'research_field', 'consent', 'created_at')
    list_filter = ('research_field', 'created_at')
    search_fields = ('research_title', 'full_name', 'email', 'institution', 'keywords')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
