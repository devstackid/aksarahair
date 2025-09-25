<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
  use SoftDeletes, HasUuids;


  protected $guarded = ['id'];

  public function services(){
    return $this->hasMany(Service::class, 'employee_id', 'id');
  }

}
