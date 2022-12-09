export const getContentsHeight = () => {
  let body_height = 0;
  let footer_height = 0;
  let inner_height = 0;
  if (typeof window === "object") {
    const body_element = document.getElementById("container");
    const footer_element = document.getElementById("footer_element");
    body_height = body_element ? body_element.scrollHeight : 0;
    footer_height = footer_element ? footer_element.scrollHeight : 0;
    inner_height = window.innerHeight;
  }
  const contents_height = body_height + footer_height;
  const new_height = inner_height < contents_height ? contents_height : inner_height;
  return new_height;
};
