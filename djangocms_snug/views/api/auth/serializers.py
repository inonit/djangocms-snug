# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ("name",)


class UserSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    groups = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "first_name", "last_name", "email",
                  "groups", "is_staff", "is_superuser")
