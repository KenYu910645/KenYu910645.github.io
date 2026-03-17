---
---
const ninja = document.querySelector("ninja-keys");

if (ninja) {
  ninja.data = [
    {
      id: "nav-home",
      title: "About",
      section: "Navigation",
      handler: () => {
        window.location.href = "{{ '/' | relative_url }}";
      },
    },
    {%- assign sorted_pages = site.pages | sort: "nav_order" -%}
    {%- for p in sorted_pages -%}
      {%- if p.nav and p.autogen == null and p.permalink != '/' -%}
        {
          id: "nav-{{ p.title | slugify }}",
          title: "{{ p.title | escape | strip | truncatewords: 13 }}",
          description: "{{ p.description | strip_html | strip_newlines | escape | strip }}",
          section: "Navigation",
          handler: () => {
            window.location.href = "{{ p.url | relative_url }}";
          },
        },
      {%- endif -%}
    {%- endfor -%}
    {%- for project in site.projects -%}
      {
        id: "project-{{ project.title | slugify }}",
        title: "{{ project.title | escape | strip | truncatewords: 13 }}",
        description: "{{ project.description | strip_html | strip_newlines | escape | strip }}",
        section: "Projects",
        handler: () => {
          window.location.href = "{{ project.url | relative_url }}";
        },
      },
    {%- endfor -%}
    {%- for pub in site.bibliography -%}
      {
        id: "publication-{{ pub.key | slugify }}",
        title: "{{ pub.title | strip_html | strip_newlines | escape | strip | truncatewords: 13 }}",
        description: "{{ pub.year | default: '' }}",
        section: "Publications",
        handler: () => {
          window.location.href = "{{ '/publications/' | relative_url }}#{{ pub.key }}";
        },
      },
    {%- endfor -%}
  ];
}
