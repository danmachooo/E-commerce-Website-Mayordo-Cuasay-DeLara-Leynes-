<%- include('layout', { title: 'Shop' }) %>

<% body = ejs.render(`
  <!-- Start Hero Section -->
  <div class="hero">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-5">
          <div class="intro-excerpt">
            <h1>Shop</h1>
          </div>
        </div>
        <div class="col-lg-7"></div>
      </div>
    </div>
  </div>
  <!-- End Hero Section -->

  <!-- Start Product Section -->
  <div class="untree_co-section product-section before-footer-section">
    <div class="container">
      <div class="row">
        <!-- Product Items -->
        <div class="col-12 col-md-4 col-lg-3 mb-5">
          <a class="product-item" href="#">
            <img src="images/product-3.png" class="img-fluid product-thumbnail">
            <h3 class="product-title">Nordic Chair</h3>
            <strong class="product-price">$50.00</strong>
          </a>
        </div> 
        <div class="col-12 col-md-4 col-lg-3 mb-5">
          <a class="product-item" href="#">
            <img src="images/product-1.png" class="img-fluid product-thumbnail">
            <h3 class="product-title">Nordic Chair</h3>
            <strong class="product-price">$50.00</strong>
          </a>
        </div> 
        <div class="col-12 col-md-4 col-lg-3 mb-5">
          <a class="product-item" href="#">
            <img src="images/product-2.png" class="img-fluid product-thumbnail">
            <h3 class="product-title">Kruzo Aero Chair</h3>
            <strong class="product-price">$78.00</strong>
          </a>
        </div>
        <div class="col-12 col-md-4 col-lg-3 mb-5">
          <a class="product-item" href="#">
            <img src="images/product-3.png" class="img-fluid product-thumbnail">
            <h3 class="product-title">Ergonomic Chair</h3>
            <strong class="product-price">$43.00</strong>
          </a>
        </div>
        <!-- Add more product items as needed -->
      </div>
    </div>
  </div>
  <!-- End Product Section -->
`) %>
