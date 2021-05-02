export default function(doc) {

  if (doc.type === "publications") {
    // For a 'post', you could use the post's Unique ID (UID)
    return "/publications/" + doc.uid;
  }
  // For other document types, just use the UID
  if (doc.uid) {
    return "/" + doc.uid;
  }
  // Otherwise, return a 404
  return "/404";
}