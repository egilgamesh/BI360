class HumanChart {
    constructor(data, keyAttribute) {
      this.data = data;
      this.keyAttribute = keyAttribute;
      this.chartContainer = document.createElement('div');
  
      this.renderChart();
    }
  
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    createGroupElement(groupKey, humanIcons, groupColor, percentage) {
      const groupElement = document.createElement('div');
      groupElement.classList.add('group');
      groupElement.style.color = groupColor;
      groupElement.innerHTML = `
        <div class="label">${groupKey}</div>
        <div class="icons">
          ${Array.from({ length: humanIcons }, () => '<i class="fas fa-user icon"></i>').join('')}
        </div>
        <div class="percentage">${percentage.toFixed(2)}%</div>
      `;
  
      return groupElement;
    }
  
    renderChart() {
      // Calculate total count
      const total = this.data.reduce((acc, item) => acc + item.value, 0);
  
      // Create and append elements for each data point
      this.data.forEach(item => {
        const groupKey = item[this.keyAttribute];
        const percentage = (item.value / total) * 100;
        const humanIcons = Math.round((item.value / total) * 10);
        const groupColor = this.getRandomColor();
        const groupElement = this.createGroupElement(groupKey, humanIcons, groupColor, percentage);
  
        this.chartContainer.appendChild(groupElement);
      });
    }
  
    getChartContainer() {
      return this.chartContainer;
    }
  }