import 'fabric';

declare module 'fabric' {
  interface Textbox {
    textDecoration?: string; // Extend the Textbox interface to include textDecoration
  }
}
