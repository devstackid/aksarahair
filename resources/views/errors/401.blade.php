@extends('errors::minimal')

@section('title', __('Unauthorized'))
@section('code', '401')
@section('message_title', __('Unauthorized'))
@section('message_description', __('Maaf, Anda belum memiliki akses. Silakan login terlebih dahulu untuk melanjutkan.'))
