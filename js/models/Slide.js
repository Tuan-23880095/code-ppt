class Slide {
    constructor(data) {
        this.thuTu = data.thuTu;
        this.tieuDe = data.tieuDe;
        this.noiDungChinh = data.noiDungChinh;     // Cột D (In đậm - h2)
        this.noiDungPhu = data.noiDungPhu;         // Cột E (Gạch đầu dòng - h3)
        this.noiDungChiTiet = data.noiDungChiTiet; // Cột F (In nghiêng - h4)
        this.anh = data.anh;
    }

    formatBullets(text) {
        if (!text) return '';
        const items = text.split('\n').filter(item => item.trim() !== '');
        return `<ul>${items.map(item => `<li><h3>${item}</h3></li>`).join('')}</ul>`;
    }

    formatText(text) {
        if (!text) return '';
        return text.replace(/\n/g, '<br>');
    }

    render() {
        return `
            <div class="slide-card">
                <h1 class="slide-title">${this.tieuDe}</h1>
                <div class="slide-body">
                    ${this.noiDungChinh ? `<h2 class="main-content"><strong>${this.formatText(this.noiDungChinh)}</strong></h2>` : ''}
                    ${this.noiDungPhu ? `<div class="sub-content">${this.formatBullets(this.noiDungPhu)}</div>` : ''}
                    ${this.noiDungChiTiet ? `<h4 class="detail-content"><em>${this.formatText(this.noiDungChiTiet)}</em></h4>` : ''}
                </div>
                ${this.anh ? `<div class="slide-image"><img src="${this.anh}" alt="Minh họa bài giảng"></div>` : ''}
            </div>
        `;
    }
}
