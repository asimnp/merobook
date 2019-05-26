// nav menu
const menus = document.querySelectorAll(".side-menu");
M.Sidenav.init(menus, { edge: "right" });

// collapsible
const collap = document.querySelectorAll(".collapsible");
M.Collapsible.init(collap, {});

// Model
const elems = document.querySelectorAll(".modal");
M.Modal.init(elems, {});
