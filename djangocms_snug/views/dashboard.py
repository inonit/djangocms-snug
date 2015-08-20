# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

from django.views.generic import TemplateView


class DashboardView(TemplateView):
    """
    View for rendering a test view
    """
    template_name = "djangocms_snug/base.html"

