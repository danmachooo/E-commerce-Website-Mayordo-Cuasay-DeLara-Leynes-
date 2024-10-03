<%- include('layout', { title: 'Home' }) %>

<% body = ejs.render(`
  <!-- Start Hero Section -->
  <div class="hero">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-5">
          <div class="intro-excerpt">
            <h1>Modern Interior <span class="d-block">Design Studio</span></h1>
            <p class="mb-4">Donec vitae odio quis nisl dapibus malesuada.</p>
            <p><a href="/shop" class="btn btn-secondary me-2">Shop Now</a></p>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="hero-img-wrap">
            <img src="/images/couch.png" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Hero Section -->

  <!-- Start Product Section -->
  <div class="product-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
          <h2 class="mb-4 section-title">Crafted with excellent material.</h2>
          <p class="mb-4">Donec vitae odio quis nisl dapibus malesuada.</p>
          <p><a href="/shop" class="btn">Explore</a></p>
        </div>

        <!-- Start Product Items -->
        <div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
          <a class="product-item" href="/cart">
            <img src="/images/product-1.png" class="img-fluid product-thumbnail">
            <h3 class="product-title">Nordic Chair</h3>
            <strong class="product-price">$50.00</strong>
          </a>
        </div>
        
        <!-- Repeat other product items as necessary -->

      </div>
    </div>
  </div>
  <!-- End Product Section -->
`) %>
