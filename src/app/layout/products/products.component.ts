import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from './../layout.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../auth/local-storage.service';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { MenuItem, MessageService } from 'primeng/api';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [MatrialListModule, PrimengListModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    providers: [MessageService],

})
export class ProductsComponent implements OnInit {
    cats: any[] = [];
    products: any[] = [];
    features: any[] = [];
    colors: any[] = [];
    offer = false;
    minPrice = 0;
    maxPrice = 50000000;
    value!: number;
    sortValue = 1;
    activeItem: MenuItem | undefined;
    displayFilter = false;
    index: number = 0;
    keywords: any;
    metaData: any;
    rangeValues: number[] = [0, 100];
    first: number = 0;
    rows: number = 10;
    catID: string | undefined;
    subCatID: string | undefined;
    screenWidth = window.innerWidth;
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
    tabs = window.innerWidth > 992 ? [
        { label: 'جدیدترین', icon: 'pi pi-fw pi-history' },
        { label: 'گران ترین', icon: 'pi pi-fw pi-sort-amount-down' },
        { label: 'ارزان ترین', icon: 'pi pi-fw pi-sort-amount-up' },
    ] : [
        { label: 'جدیدترین', icon: 'pi pi-fw pi-history' },
        { label: 'گران ترین', icon: 'pi pi-fw pi-sort-amount-down' },
        { label: 'ارزان ترین', icon: 'pi pi-fw pi-sort-amount-up' },
        { label: 'فیلترها', icon: 'pi pi-fw pi-filter' },

    ];

    dataObject: any[] = [];

    filter = { minPrice: 0, maxPrice: 5000000000 }

    filterIt() {
        // this.products = this.products.filter((item: any) => item.title.toLowerCase().includes(event.query.toLowerCase()));
        this.products = this.products.filter((item: any) => (item.price >= this.minPrice && item.price <= this.maxPrice));
        // this.products = this.products.filter(value => {
        //     const data = { ...value };
        //     data.List = data.List.map((ch: any) => {
        //         const list = { ...ch };
        //         list.info = list.info.filter((gChild: any) => {
        //             return gChild.RegCategoryName.toLowerCase().indexOf(this.filter.RegCategoryName.toLowerCase()) !== -1
        //         });
        //         return list;
        //     });
        //     return data.List.some((list: any) => !!list.RegistrationCategory.length);
        // });
    }
    getProducts():any {
        let data;
        if (window.history.state.catID != undefined) {
            this.keywords = window.history.state.keywords;
            this.metaData = window.history.state.metaData;
            data = {
                categoryID: window.history.state.catID,
                updatedAt: -1,
            };
        } else if (window.history.state.catID == undefined) {
            data = {
                updatedAt: -1,
            };
        }
        else {
            data = {
                updatedAt: -1,
            };
        }
        this.service.searchProduct(data).subscribe((response: any) => {
            if (response.success === true) {
                this.products = response.data;
            }
        });
        return this.products
    }
    activateMenu(event: any) {
        if (event.label === 'جدیدترین') {
        }
        if (event.label === 'گران ترین') {
        }
        if (event.label === 'فیلترها') {
            this.displayFilter = true;
        }
        if (event.label === 'ارزان ترین') {
        }
    }

    hasOffer() {

    }

    sort(sortId: any): void {
        let data;
        switch (sortId) {
            case 1:
                if (this.catID === '0' && this.subCatID === '0') {
                    data = {
                        updatedAt: -1,
                    };
                } else if (this.catID !== '0' && this.subCatID === '0') {
                    data = {
                        categoryID: this.catID,
                        updatedAt: -1,
                    };
                } else {
                    data = {
                        catID: this.catID,
                        subCatID: this.subCatID,
                        updatedAt: -1,
                    };
                }
                break;
            case 2:
                if (this.catID === '0' && this.subCatID === '0') {
                    data = {
                        price: 1,
                    };
                } else if (this.catID !== '0' && this.subCatID === '0') {
                    data = {
                        price: 1,
                    };
                } else {
                    data = {

                        price: 1,
                    };
                }
                break;
            case 3:
                if (this.catID === '0' && this.subCatID === '0') {
                    data = {
                        price: -1,
                    };
                } else if (this.catID !== '0' && this.subCatID === '0') {
                    data = {
                        price: -1,
                    };
                } else {
                    data = {

                        price: -1,
                    };
                }
                break;
        }
    }


    constructor(
        private service: LayoutService,
        private messageService: MessageService,
        private route: ActivatedRoute) { }

    resetIndex(i: any): void {
        this.index = i;
    }

    ngOnInit(): void {
        // this.route.paramMap.subscribe((params) => { this.categoryId = params.get('id') });
        // [queryParams]="{id:product._id}"
        this.getCat();
        this.getFeature();
        this.getColor();
        this.getProducts();
        //  console.log(this.keywords, this.metaData);
    }

    openFilter(): void {
        this.displayFilter = true;
    }



    getColor() {
        this.service.getColor().subscribe((response: any) => {
            if (response.success === true) {
                this.colors = response.data;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: ' دریافت نشد ',
                });
            }
        });
    }

    getFeature() {
        this.service.getFeature().subscribe((response: any) => {
            if (response.success === true) {
                this.features = response.data;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: ' دریافت نشد ',
                });
            }
        });
    }
    getCat() {
        this.service.getCat().subscribe((response: any) => {
            if (response.success === true) {
                this.cats = response.data;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: ' دریافت نشد ',
                });
            }
        });
    }

    goProduct(catId: any): any {
        let data;
        if (catId == '0') {
            data = {
                updatedAt: -1,
            };
        } else if (catId !== '0') {
            let cat = this.cats.filter((item) => item._id == catId)[0];
            this.keywords = cat.keywords;
            this.metaData = cat.metaData;
            data = {
                categoryID: catId,
                updatedAt: -1,
            };
        }
        this.service.searchProduct(data).subscribe((response: any) => {
            if (response.success === true) {
                this.products = response.data;
            }
        });
    }
}
