## About

Email Builder is a single-paged web application that allows its users to create and edit emails from pre-made templates. It builds a bridge in communication between developer and marketer, making the email creation process more efficient and less frustrating. This app allows developers to create custom templates that can be used by anyone with local access to the file. No coding experience is necessary to use these templates in Email Builder. Anyone can easily go from template to final email. No sign up or log in necessary. Email Builder allows full privacy of information, as all files are locally stored by the user and are never actually uploaded anywhere.

## Docs

- **How to Create a Template**
  - To start off, create a table element in the body of your email template file, with a total of 1 column and 1 row. It will automatically have a width attribute of 100%, however it is recommended that you add this in while building your template for your own viewing purposes. Any style attributes will be read by the Email Builder. The table’s td element, will also automatically have an align attribute of center. It is also recommended to include this in your template for your own viewing purposes.

  - Inside the table you just created add another table and give it a class “block.” Create it as you see fit and the Email Builder will parse this element and its children as a template block. The user will be able to add, remove, and reorder these template blocks inside the email. Create as many template blocks as you see fit. There are three types of blocks: header block, footer block, and block. Please see the class guide for more information on these block types.

  - Optionally, after the closing tag of the first table you created, you can create a list of HEX colors to utilize in the template’s Medium Editors. This list will only accept a single level, DO NOT nest list items.

  - An additional option, after the closing tag of the first table you created, you can create a list of image URLs to utilize in the template’s image editor. These images will appear in a list format for the user to select from. This list will only accept a two-level nested unordered list. The first level should be grouping titles and the second level should be the direct URLs to the photos.

  - All style tags will be imported from the email template file.

- **Template Classes**
  - **block** — Adding the class “block” to an HTML element will make the email builder parse it as template block.

  - **header block** — Adding the class “header-block” to an HTML element will make the email builder parse sit as a header block. Header blocks sit at the beginning of the document, in the same order that they are created in the template file. They are not considered template blocks and will not appear in the template block sidebar. Additionally, header blocks are not able to be deleted and cannot be moved around or reordered.

  - **footer block** — Adding the class “footer-block” to an HTML element will make the email builder parse sit as a footer block. Footer blocks sit at the end of the document, in the same order that they are created in the template file. They are not considered template blocks and will not appear in the template block sidebar. Additionally, footer blocks are not able to be deleted and cannot be moved around or reordered.

  - **editable** — Adding the class “editable” to an HTML element will make the element editable, according to the element type:

    - `<a>` tags will open the link editor, allowing the user to edit the text of the hyperlink and the link to which it leads.
      
    - `<img>` tags will open the image editor, allowing the user to edit the image, alt-text, and link to which the image leads.
    
    - Container tags, like `<span>` and `<td>` will create a Medium Editor, allowing the user to edit the text directly on the page, with a toolbar of bold, italics, underlink, anchor, and colors set by the user.

  - **editable-fixed** — Adding the class “editable-fixed” to an HTML element will make the element editable with fixed variables, according to the element type:

    - `<a>` tags will open the link editor, allowing the user to edit the text of the hyperlink and the link to which it leads. This will be no different than an `<a>` tag with the class “editable.”
    
    - `<img>` tags will open the image editor, allowing the user to edit the image, alt-text, and link to which the image leads. The image will, however, retain the height and width attributes set in the template file.

    - Container tags, like `<span>` and `<td>` will create a Medium Editor, allowing the user to edit the text directly on the page, WITHOUT a toolbar. All styling defined in the template will remain.

  - **fixed-width** — Adding the class “fixed-width” to an `<img>` element will force whatever image selected to be constrained to the width attribute specified in the template.

  - **clearable** — Adding the class “clearable” to an HTML element will allow the user to clear all contents of that element. This is useful for when deleting the entire element will affect the template (e.g. removing a `<td>` as opposed to making it empty, for a multi-column layout). The user does have the option to place it back if they choose.

  - **removable** — Adding the class “removable” to an HTML element will allow the user to remove the element entirely from the email. The user does have the option to place it back if they choose.

  - **repeatable** — Adding the class “repeatable” to an HTML element will allow the user to duplicate the element, reorder the element with its neighboring “repeatable” class elements, and delete the elements, as they see fit.