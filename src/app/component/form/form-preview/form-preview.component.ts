import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-form-preview',
	templateUrl: './form-preview.component.html',
	styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {
	id: string = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router) {

	}

	ngOnInit(): void {
		this.id = '';
		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];

		});
		this.openFile();
	}

	openFile() {
		// this.router.navigate(['../'], { relativeTo: this.route });
		window.open('assets/form/' + this.id + '.pdf');
	}

	// ngAfterViewInit() {
	// 	PSPDFKit.load({
	// 		// Use the assets directory URL as a base URL. PSPDFKit will download its library assets from here.
	// 		baseUrl:
	// 			location.protocol + '//' + location.host + '/assets/',
	// 		// Replace [YOUR-DOCUMENT] with your document's name
	// 		document: '/assets/form/formA.pdf',
	// 		container: '#pspdfkit-container',
	// 	}).then((instance) => {
	// 		// For the sake of this demo, store the PSPDFKit for Web instance
	// 		// on the global object so that you can open the dev tools and
	// 		// play with the PSPDFKit API.
	// 		(window as any).instance = instance;
	// 	});
	// }
}
