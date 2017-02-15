import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';


@inject(Router, Service)
export class List {
    data = [];
    keyword = '';

    today = new Date();
    info = { page: 1, keyword: '' };

    isPrint = false;

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    async activate() {
        this.info.keyword = '';
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;
    }

    loadPage() {
        var keyword = this.info.keyword;
        this.service.search(this.info)
            .then(result => {
                this.data = result.data;
                this.info = result.info;
                this.info.keyword = keyword;
            })
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.loadPage();
    }

    back() {
        this.router.navigateToRoute('list');
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    create() {
        this.router.navigateToRoute('create');
    }

    getPDF(data) {
        this.service.getPdfById(data._id);
    }

    // getPDFRetur(data) {
    //     this.service.getPdfReturById(data._id);
    // }
}