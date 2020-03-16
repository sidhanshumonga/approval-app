import { Component, Input } from '@angular/core'

/**
 * Shows loading div as overlay on a div where this component is placed.
 * Uses value of input "waiting" to show/hide the loading div
 */
@Component({
    selector: 'app-loader',
    template: `<div class="loading-overlay-section"></div>`
})
export class AppLoaderComponent {
}
