//resources/views/plans.blade.php
@extends('layouts.app')
   
@section('content')
<div class="container">
<section>
  <div class="container py-5">
     
  <header class="text-center mb-5 text-white">
      <div class="row">
        <div class="col-lg-12 mx-auto">
          <h1>Laravel 9 Cashier Stripe Subscription</h1>
          <h3>PRICING</h3>
        </div>
      </div>
    </header>
 
    <div class="row text-center align-items-end">
        <div class="col-lg-4 mb-5 mb-lg-0">
            <div class="bg-white p-5 rounded-lg shadow">
            <h1 class="h6 text-uppercase font-weight-bold mb-4">FREE</h1>
            <h2 class="h1 font-weight-bold">$0<span class="text-small font-weight-normal ml-2">/ free</span></h2>
 
            <div class="custom-separator my-4 mx-auto bg-primary"></div>
 
            <ul class="list-unstyled my-5 text-small text-left">
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> Lorem ipsum dolor sit amet</li>
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> Sed ut perspiciatis</li>
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> At vero eos et accusamus</li>
                <li class="mb-3 text-muted">
                <i class="fa fa-times mr-2"></i>
                <del>Nam libero tempore</del>
                </li>
                <li class="mb-3 text-muted">
                <i class="fa fa-times mr-2"></i>
                <del>Sed ut perspiciatis</del>
                </li>
                <li class="mb-3 text-muted">
                <i class="fa fa-times mr-2"></i>
                <del>Sed ut perspiciatis</del>
                </li>
            </ul>
            <a href="#" class="btn btn-primary btn-block shadow rounded-pill">Buy Now</a>
            </div>
        </div>
 
        @foreach($plans as $plan)
        <div class="col-lg-4 mb-5 mb-lg-0">
            <div class="bg-white p-5 rounded-lg shadow">
            <h1 class="h6 text-uppercase font-weight-bold mb-4">{{ $plan->name }}</h1>
            <h2 class="h1 font-weight-bold">${{ $plan->price }}<span class="text-small font-weight-normal ml-2">/ month</span></h2>
 
            <div class="custom-separator my-4 mx-auto bg-primary"></div>
 
            <ul class="list-unstyled my-5 text-small text-left font-weight-normal">
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> Lorem ipsum dolor sit amet</li>
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> Sed ut perspiciatis</li>
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> At vero eos et accusamus</li>
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> Nam libero tempore</li>
                <li class="mb-3">
                <i class="fa fa-check mr-2 text-primary"></i> Sed ut perspiciatis</li>
                <li class="mb-3 text-muted">
                <i class="fa fa-times mr-2"></i>
                <del>Sed ut perspiciatis</del>
                </li>
            </ul>
            <a href="{{ route('plans.show', $plan->slug) }}" class="btn btn-primary btn-block shadow rounded-pill">Buy Now</a>
            </div>
        </div>
        @endforeach
    </div>
  </div>
</section>
 
</div>
@endsection