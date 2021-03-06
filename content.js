function findAndHide(element) {
  let items = new Array;

  let qs = [
    // By URLs
    "a[href*='youracclaim.com/badges/']",
    "a[href*='credly.com/badges/']",
    "a[href*='www.credential.net/']",
    "a[href*='coursera.org/share/']",
    "a[href*='certificates.cloudbees.com']",
    "a[href*='educba.com/certificate/']",
    "a[href*='bcert.me/']",
    "a[href*='university.mongodb.com/course_completion/']",
    "a[href*='verify.acloud.guru']",

    // Everything with tags
    "a[href*='linkedin.com/feed/hashtag/?keywords=awscertified']",
    "a[href*='linkedin.com/feed/hashtag/?keywords=azurecertified']",
    "a[href*='linkedin.com/feed/hashtag/?keywords=microsoftcertified']",

    // Certificates
    "img[alt='AWS Certified Developer-Associate']"
  ];

  qs.forEach(function (qs) {
    items.push(...element.querySelectorAll(qs));
  });

  // if (items.length > 0) {
  //   console.log("Searching in:", element);
  //   console.log("Found these items:", items);
  // }

  items.forEach(function (item) {
    let current = item;

    while (current && current.parentNode) {
      if (current.hasAttribute("data-id")) {
        if (!current.classList.contains("visually-hidden")) {
          console.log("Hiding element: ", current);
          current.classList.add("visually-hidden")
          // current.style.border = "10px solid red"
        }
      }
      current = current.parentNode;
    }

  });
}

// Hide during initial phase (sometimes it should help)
findAndHide(document);

// Select the node that will be observed for mutations
const targetNode = document.getElementById('voyager-feed');

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      findAndHide(mutation.target)
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
