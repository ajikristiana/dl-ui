import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        // this.data = {};
        // this.error = {};
    }

    activate(params) {

    }

    bind() {
        this.data = {};
    }

    get list() {
        return (event) => this.router.navigateToRoute('list');
    }

    get save() {
        return (event) => {

            this.service.create(this.data)
                .then(result => {
                    this.list();
                })
                .catch(e => {
                    this.error = e;
                })
        }
    }
}