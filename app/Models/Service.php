<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes, HasUuids;

    protected $guarded = ['id'];


    public function employee(){
        return $this->belongsTo(Employee::class, 'employee_id', 'id')->withTrashed();
    }
    public function service_item(){
        return $this->belongsTo(ServiceItem::class, 'service_item_id', 'id');
    }
}
