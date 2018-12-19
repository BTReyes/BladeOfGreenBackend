$(document).ready(function() {
  // Getting references to the name input and order container, as well as the table body
  var nameInput = $("#order-name");
  var orderList = $("tbody");
  var orderContainer = $(".order-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Order
  $(document).on("submit", "#order-form", handleOrderFormSubmit);
  $(document).on("click", ".delete-order", handleDeleteButtonPress);

  // Getting the initial list of Orders
  getOrders();

  // A function to handle what happens when the form is submitted to create a new Order
  function handleOrderFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertOrder function and passing in the value of the name input
    upsertOrder({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an order. Calls getOrders upon completion
  function upsertOrder(orderData) {
    $.post("/api/orders", orderData)
      .then(getOrders);
  }

  // Function for creating a new list row for orders
  function createOrderRow(orderData) {
    var newTr = $("<tr>");
    newTr.data("order", orderData);
    newTr.append("<td>" + orderData.name + "</td>");
    newTr.append("<td> " + orderData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?order_id=" + orderData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?order_id=" + orderData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-order'>Delete Order</a></td>");
    return newTr;
  }

  // Function for retrieving orders and getting them ready to be rendered to the page
  function getOrders() {
    $.get("/api/orders", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createOrderRow(data[i]));
      }
      renderOrderList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of orders to the page
  function renderOrderList(rows) {
    orderList.children().not(":last").remove();
    orderContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      orderList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no orders
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Order before you can create a Post.");
    orderContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("order");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/orders/" + id
    })
      .then(getOrders);
  }
});
