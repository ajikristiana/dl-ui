import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {


    columns = [

        { field: "no", title: "no" },
        { field: "roNo", title: "nomor Ro" },
        { field: "artikel", title: "artikel" },
        {
            field: "date", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "migrated", title: "migrated" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        console.log(info)
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            select: ["no", "roNo", "date", "artikel", "migrated"]
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.total = result.info.total;
                data.data = result.data;
                return data;
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

    create() {
        this.router.navigateToRoute('migrate');
    }

}

