import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

// Note: Debouncing means
// Debouncing is removing unwanted input noise from buttons, switches or other user input. Debouncing prevents extra activations or slow functions from triggering too often. Debouncing is used in hardware switches, programs and websites.
// Debouncing is a programming pattern or a technique to restrict the calling of a time-consuming function frequently, by delaying the execution of the function until a specified time to avoid unnecessary CPU cycles, and API calls and improve performance.

// Note: The debounceTime() operator
// The 'debounceTime' operator introduces the time dimension. It is about debouncing the incoming values. So if we would provide two seconds as the debounce time and our source Observable would emit quickly three values. The 'debounceTime' operator would wait for the emissions to settle down, and after two seconds of no new emissions, it would reemit just the latest value. This is useful to avoid putting excessive pressure on some recalculation logic to avoid performance issues or, for example, to reduce the frequency of HTTP requests sent to the server.
// The error and complete notifications are not delayed and are passed through immediately in an unchanged form.

// Example:
// We'll make an Observable which will emit the value of this slider each time the user moves it. We'll also use the 'debounceTime' operator to emit the value after the users stop sliding and the value settles for a short time.
// This is useful if the logic which we would like to run for the updated value would require a lot of calculations and might cause slowdowns.
// So for better user interface responsiveness, we might want to debounce the emitted values by using the 'debounceTime' operator.
// Another case is when we would like to store the setting of this slider on the server. Without debouncing every minor movement of the slider would trigger a new HTTP request, so in the short while, dozens of new HTTP requests might be generated.
// That's what the 'debounceTime' operator is for.

const sliderInput = document.querySelector('input#slider');

// Note: Multiple values are emitted
// fromEvent(sliderInput, 'input')
//   .pipe(map((event) => event.target['value']))
//   .subscribe((value) => console.log(value));

// As we start moving this slider and keep it moving, no value is emitted as I keep changing my mind. And if I stop and wait for two seconds, which is the debounce time we've provided, only the latest value will be emitted.
// So if you would like to call an HTTP endpoint using that value or trigger some CPU-heavy recalculations, it is worth using the 'debounceTime' operator.
fromEvent(sliderInput, 'input')
  .pipe(
    debounceTime(2000),
    map((event) => event.target['value'])
  )
  .subscribe((value) => console.log(value));
