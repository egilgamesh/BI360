// Define your report item classes here

// Base class for report items
class ReportItem {
    constructor(type, id, top,left, width, height) {
        this.type = type;
        this.id=id;
        this.top=top;
        this.left=left;
        this.width=width;
        this.height=height;
    }
}

// Text report item class
class TextItem extends ReportItem {
    constructor(id, content, fontSize, fontFamily, color, top,left,width,height) {
        super('text', id, top, left,width,height );
        this.content = content;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.color = color;
    }
}

// Image report item class
class ImageItem extends ReportItem {
    constructor(id, src, width, height, top, left) {
        super('image', id, top, left,width,height);
        this.source = src;
    }
}

// Link report item class
class LinkItem extends ReportItem {
    constructor(text, url, id, top, left,width,height) {
        super('link',id, top, left,width,height);
        this.text = text;
        this.url = url;
    }
}

// Bar chart report item class
class BarChartItem extends ReportItem {
    constructor(data, labels, backgroundColor, borderColor, id, top, left,width,height) {
        super('barchart', id, top, left,width,height);
        this.data = data;
        this.labels = labels;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
    }
}

// Line chart report item class
class LineChartItem extends ReportItem {
    constructor(data, labels, borderColor, id, top, left,width,height) {
        super('linechart', id, top, left,width,height);
        this.data = data;
        this.labels = labels;
        this.borderColor = borderColor;
    }
}

// Pie chart report item class
class PieChartItem extends ReportItem {
    constructor(data, labels, backgroundColor, id, top, left,width,height) {
        super('piechart', id, top, left,width,height);
        this.data = data;
        this.labels = labels;
        this.backgroundColor = backgroundColor;
    }
}

// Table report item class
class TableItem extends ReportItem {
    constructor(data, columns, id, top, left,width,height) {
        super('table', id, top, left,width,height);
        this.data = data;
        this.columns = columns;
    }
}

// Treemap report item class
class TreemapItem extends ReportItem {
    constructor(data, id, top, left,width,height) {
        super('treemap', id, top, left,width,height);
        this.data = data;
    }
}

// Score card report item class
class ScoreCardItem extends ReportItem {
    constructor(score, title, description, id, top, left,width,height) {
        super('scorecard', id, top, left,width,height);
        this.score = score;
        this.title = title;
        this.description = description;
    }
}

// Cluster bar report item class
class ClusterBarItem extends ReportItem {
    constructor(data, labels, backgroundColors, id, top, left,width,height) {
        super('clusterbar', id, top, left,width,height);
        this.data = data;
        this.labels = labels;
        this.backgroundColors = backgroundColors;
    }
}

// Stack bar report item class
class StackBarItem extends ReportItem {
    constructor(data, labels, backgroundColors, id, top, left,width,height) {
        super('stackbar', id, top, left,width,height);
        this.data = data;
        this.labels = labels;
        this.backgroundColors = backgroundColors;
    }
}

// Donut chart report item class
class DonutChartItem extends ReportItem {
    constructor(data, labels, backgroundColors, id, top, left,width,height) {
        super('donutchart', id, top, left,width,height);
        this.data = data;
        this.labels = labels;
        this.backgroundColors = backgroundColors;
    }
}

// Community card report item class
class CommunityCardItem extends ReportItem {
    constructor(title, subtitle, imageUrl, score, id, top, left,width,height) {
        super('communitycard', id, top, left,width,height);
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
        this.score = score;
    }
}