$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and order select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var orderSelect = $("#order");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var orderId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an order_id in our url, preset the order select box to be our Order
  else if (url.indexOf("?order_id=") !== -1) {
    orderId = url.split("=")[1];
  }

  // Getting the orders, and their posts
  getOrders();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or order
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !orderSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      OrderId: orderSelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an order's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
    case "post":
      queryUrl = "/api/posts/" + id;
      break;
    case "order":
      queryUrl = "/api/orders/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.OrderId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        orderId = data.OrderId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Orders and then render our list of Orders
  function getOrders() {
    $.get("/api/orders", renderOrderList);
  }
  // Function to either render a list of orders, or if there are none, direct the user to the page
  // to create an order first
  function renderOrderList(data) {
    if (!data.length) {
      window.location.href = "/orders";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createOrderRow(data[i]));
    }
    orderSelect.empty();
    console.log(rowsToAdd);
    console.log(orderSelect);
    orderSelect.append(rowsToAdd);
    orderSelect.val(orderId);
  }

  // Creates the order options in the dropdown
  function createOrderRow(order) {
    var listOption = $("<option>");
    listOption.attr("value", order.id);
    listOption.text(order.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
