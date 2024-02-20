function saveAsHTML() {
    const editorContent = document.getElementById("editor").innerHTML;
    const stylesheets = Array.from(document.styleSheets).map(styleSheet => {
        return `<link rel="stylesheet" href="${styleSheet.href}">`;
    }).join("\n");

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Editor Content</title>
            ${stylesheets}
        </head>
        <body>
            <div id="editorContent">
                ${editorContent}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "editor_content.html";
    a.style.display = "none";
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
}