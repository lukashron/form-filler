# Form Filler

## Install
```
composer require lukashron/form-filler
```

## Use

```php
$mode = \LukasHron\FormFiller\Filler::MODE_DEVELOPMENT;
$mode = \LukasHron\FormFiller\Filler::MODE_PRODUCTION;

\LukasHron\FormFiller\Filler::enabled($mode);
```