# koncreate accordion

less file for koncreate accordion
~~~css

/**
* Elementor Overwrite
**/
// elementor-accordion
.elementor-widget-accordion .elementor-accordion .elementor-tab-title.elementor-active {
  color: @primaryColor;
}

.elementor-widget-accordion .elementor-accordion .elementor-tab-title {
  color: #444;
}

.elementor-accordion {
  .elementor-accordion-item {
    border: none;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
    .elementor-tab-title {
      padding: 0;
      border-radius: 4px;
      border: 1px solid @primaryColor;
      height: 56px;
      width: 100%;
      display: flex;
      align-items: center;
      span.elementor-accordion-icon {
        background-color: @primaryColor;
        color: white;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        margin-left: 10px;
        .elementor-accordion-icon-closed {
          color: white;
          font-weight: 900;
        }
        .elementor-accordion-icon-open {

        }
      }
      a {
        color: #111;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.6;
      }
      &.elementor-active {
        background-color: @primaryColor;
        span.elementor-accordion-icon {
          background-color: #fff;
          color: @primaryColor;
          .elementor-accordion-icon-open {
            color: @primaryColor;
            font-weight: 900;
          }
        }
        a {
          color: #fff;
        }
      }
    }
    .elementor-tab-content {
      border: none;
      margin: 20px 0 20px 20px;
      padding: 5px 10px;
      border-left: 1px solid @primaryColor;
      p:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }
  }
}

~~~
