# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission

from rest_framework import serializers


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ("id", "name", "codename")


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ("id", "name", "permissions")


class UserSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    user_permissions = PermissionSerializer(many=True, read_only=True)
    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "first_name", "last_name", "email",
                  "user_permissions", "groups", "is_staff", "is_superuser")
