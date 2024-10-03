<!doctype html>
<html lang="en">

  <!-- Include the head partial -->
  <%- include('partials/head') %>

  <body>

    <!-- Include the header partial -->
    <%- include('partials/header') %>

    <!-- Dynamic body content -->
    <main>
      <%- body %>
    </main>

    <!-- Include the footer partial -->
    <%- include('partials/footer') %>

    <!-- Include the scripts partial -->
    <%- include('partials/scripts') %>

  </body>
</html>
