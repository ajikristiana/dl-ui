export class StepIndicatorItem {
  activate(context) {
    console.log("step-indicator-Items")
    this.context = context;
    this.stepIndicator = context.data;
    this.error = context.error;
    this.options = context.options;
  } 

  controlOptions = {
    control: {
      length: 12
    }
  };
}