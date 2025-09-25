<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceItem extends Model
{
    use HasUuids, SoftDeletes;

    protected $guarded = ['id'];

    public function services()
    {
        return $this->hasMany(Service::class , 'service_item_id', 'id');
    }
}
