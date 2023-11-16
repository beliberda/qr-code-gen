function dateFormat(date) {
    return (
        date.getDate() +
        "." +
        (date.getMonth() + 1) +
        "." +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
    );
}

function replaceTemplateAttribute(product, template) {
    const attributeMass = [
        {
            title: "name",
            text: "{название товара}"
        },
        {
            title: "category",
            text: "{категория товара}"
        },
        {
            title: "size",
            text: "{размер товара}"
        },
        {
            title: "url",
            text: "{ссылка на товар}"
        },
    ]

    attributeMass.forEach(element => {
        let temp
        for (const key of Object.keys(product)) {
            if (key === element.title) {
                temp = product[key]
                console.log("temp", temp);
                break
            }
        }
        template = template.replace(element.text, temp)
    });
    return template

}
export { dateFormat, replaceTemplateAttribute }