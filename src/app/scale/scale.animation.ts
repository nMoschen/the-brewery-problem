import { animate, state, style, transition, trigger } from "@angular/animations";

// The duration of the animation is set to 250ms just to better appreciate it. It can be changed to 50ms if necessary
export const scaleAnimationDuration = 250;

export const scaleAnimation = trigger('scaleAnimation', [
  state('*', style({ transform: `rotate({{ rotation }}deg)` }), { params: { rotation: 0 }}),
  transition(`* <=> *`, animate(`${scaleAnimationDuration}ms cubic-bezier(.62,0,.58,1.62)`, style({ transform: `rotate({{ rotation }}deg)` })))
]);
