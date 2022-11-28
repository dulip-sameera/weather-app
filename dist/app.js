/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/API/get_country_name.js":
/*!*************************************!*\
  !*** ./src/API/get_country_name.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_country_name)
/* harmony export */ });
async function get_country_name(country_code) {
  try {
    const country = await fetch(
      `https://restcountries.com/v2/alpha/${country_code}`
    );

    const data = await country.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/API/get_data.js":
/*!*****************************!*\
  !*** ./src/API/get_data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_data)
/* harmony export */ });
/* harmony import */ var _api_key_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-key.json */ "./src/API/api-key.json");


async function get_data({ lon, lat, unit }) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_api_key_json__WEBPACK_IMPORTED_MODULE_0__.openWeatherAPIKey}&units=${unit}`
    );

    const weather_data = await response.json();
    return weather_data;
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/API/get_lat_and_lon_from_city_name.js":
/*!***************************************************!*\
  !*** ./src/API/get_lat_and_lon_from_city_name.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_lat_and_lon_from_city_name)
/* harmony export */ });
/* harmony import */ var _api_key_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-key.json */ "./src/API/api-key.json");


async function get_lat_and_lon_from_city_name(city_name) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${_api_key_json__WEBPACK_IMPORTED_MODULE_0__.openWeatherAPIKey}`
    );

    const data = await response.json();

    return data[0];
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/core/get_data_by_city_name.js":
/*!*******************************************!*\
  !*** ./src/core/get_data_by_city_name.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_data_by_city_name)
/* harmony export */ });
/* harmony import */ var _API_get_lat_and_lon_from_city_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../API/get_lat_and_lon_from_city_name */ "./src/API/get_lat_and_lon_from_city_name.js");
/* harmony import */ var _API_get_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API/get_data */ "./src/API/get_data.js");
/* harmony import */ var _API_get_country_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../API/get_country_name */ "./src/API/get_country_name.js");




async function get_data_by_city_name(city_name, unit) {
  try {
    const city = await (0,_API_get_lat_and_lon_from_city_name__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name);
    const response = await (0,_API_get_data__WEBPACK_IMPORTED_MODULE_1__["default"])({
      lon: city.lon,
      lat: city.lat,
      unit: unit,
    });

    let country;
    if (response.sys.country === "GB") country = { name: "United Kingdom" };
    else {
      country = await (0,_API_get_country_name__WEBPACK_IMPORTED_MODULE_2__["default"])(response.sys.country);
    }

    const data = {
      current_temp: response.main.temp,
      feels_like: response.main.feels_like,
      humidity: response.main.humidity,
      wind_speed: response.wind.speed,
      status: response.weather[0].main,
      city: response.name,
      country: country.name,
    };
    return data;
  } catch (e) {
    console.log(e);
  }
}


/***/ }),

/***/ "./src/ui/load_data.js":
/*!*****************************!*\
  !*** ./src/ui/load_data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ load_data)
/* harmony export */ });
/* harmony import */ var _core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/get_data_by_city_name */ "./src/core/get_data_by_city_name.js");
/* harmony import */ var _utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/get_element_by_id */ "./src/utils/get_element_by_id.js");
/* harmony import */ var _utils_units__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/units */ "./src/utils/units.js");




async function load_data(event) {
  if (event.key === "Enter") {
    try {
      const city_name = event.target.value;
      event.target.value = "";
      const unit = _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.name;
      const data = await (0,_core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name, unit);

      // DOM Cache
      const weather_condition_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("weather-condition");
      const city_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("city");
      const country_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("country");
      const current_temp_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("current_temp");
      const feels_like_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("feels_like");
      const wind_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("wind");
      const humidity_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_1__["default"])("humidity");

      weather_condition_field.textContent = data.status;
      city_field.textContent = data.city.toUpperCase();
      country_field.textContent = data.country.toUpperCase();
      current_temp_field.innerHTML = `${data.current_temp}<sup><sup>0</sup>${
        unit === _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.name
          ? _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.temp_symbol
          : _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.temp_symbol
      }</sup>`;
      feels_like_field.innerHTML = `${data.feels_like}<sup><sup>0</sup>${
        unit === _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.name
          ? _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.temp_symbol
          : _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.temp_symbol
      }</sup>`;
      wind_field.textContent = `${data.wind_speed} ${
        unit === _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.name
          ? _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].IMPERIAL.speed_symbol
          : _utils_units__WEBPACK_IMPORTED_MODULE_2__["default"].METRIC.speed_symbol
      }`;
      humidity_field.textContent = `${data.humidity}%`;
    } catch (e) {
      window.alert("Enter again");
      console.log(e);
    }
  }
}


/***/ }),

/***/ "./src/ui/page_load.js":
/*!*****************************!*\
  !*** ./src/ui/page_load.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ page_load)
/* harmony export */ });
/* harmony import */ var _core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/get_data_by_city_name */ "./src/core/get_data_by_city_name.js");
/* harmony import */ var _utils_event_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/event_bind */ "./src/utils/event_bind.js");
/* harmony import */ var _utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/get_element_by_id */ "./src/utils/get_element_by_id.js");
/* harmony import */ var _utils_units__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/units */ "./src/utils/units.js");
/* harmony import */ var _load_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./load_data */ "./src/ui/load_data.js");






async function page_load(city_name, unit) {
  const data = await (0,_core_get_data_by_city_name__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name, unit);

  // DOM Cache
  const weather_condition_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("weather-condition");
  const city_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("city");
  const country_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("country");
  const current_temp_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("current_temp");
  const feels_like_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("feels_like");
  const wind_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("wind");
  const humidity_field = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("humidity");

  const search_city_input = (0,_utils_get_element_by_id__WEBPACK_IMPORTED_MODULE_2__["default"])("city_search");

  weather_condition_field.textContent = data.status;
  city_field.textContent = data.city.toUpperCase();
  country_field.textContent = data.country.toUpperCase();
  current_temp_field.innerHTML = `${data.current_temp}<sup><sup>0</sup>${
    unit === _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.name
      ? _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.temp_symbol
      : _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].METRIC.temp_symbol
  }</sup>`;
  feels_like_field.innerHTML = `${data.feels_like}<sup><sup>0</sup>${
    unit === _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.name
      ? _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.temp_symbol
      : _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].METRIC.temp_symbol
  }</sup>`;
  wind_field.textContent = `${data.wind_speed} ${
    unit === _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.name
      ? _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].IMPERIAL.speed_symbol
      : _utils_units__WEBPACK_IMPORTED_MODULE_3__["default"].METRIC.speed_symbol
  }`;
  humidity_field.textContent = `${data.humidity}%`;

  (0,_utils_event_bind__WEBPACK_IMPORTED_MODULE_1__["default"])({
    event: "keydown",
    fn: _load_data__WEBPACK_IMPORTED_MODULE_4__["default"],
    element: search_city_input,
  });
}


/***/ }),

/***/ "./src/utils/event_bind.js":
/*!*********************************!*\
  !*** ./src/utils/event_bind.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ event_bind)
/* harmony export */ });
function event_bind({ event, fn, element }) {
  if (!(element instanceof NodeList)) {
    element.addEventListener(event, fn);
    return;
  }

  element.forEach((ele) => {
    ele.addEventListener(event, fn);
  });
}


/***/ }),

/***/ "./src/utils/get_element_by_id.js":
/*!****************************************!*\
  !*** ./src/utils/get_element_by_id.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get_element_by_id)
/* harmony export */ });
function get_element_by_id(id) {
  return document.getElementById(id);
}


/***/ }),

/***/ "./src/utils/units.js":
/*!****************************!*\
  !*** ./src/utils/units.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const units = {
  IMPERIAL: {
    name: "imperial",
    temp_symbol: "F",
    speed_symbol: "MPH",
  },
  METRIC: {
    name: "metric",
    temp_symbol: "C",
    speed_symbol: "KMPH",
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (units);


/***/ }),

/***/ "./src/API/api-key.json":
/*!******************************!*\
  !*** ./src/API/api-key.json ***!
  \******************************/
/***/ ((module) => {

module.exports = JSON.parse('{"openWeatherAPIKey":"306fecd6fde571057036731a5044cefd"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_page_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/page_load */ "./src/ui/page_load.js");
/* harmony import */ var _utils_units__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/units */ "./src/utils/units.js");



const city_name = "panadura";
const unit = _utils_units__WEBPACK_IMPORTED_MODULE_1__["default"].METRIC.name;
(0,_ui_page_load__WEBPACK_IMPORTED_MODULE_0__["default"])(city_name, unit);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7QUM3Q2Usc0JBQXNCLG9CQUFvQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUNUZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQ2JyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNMOztBQUVsQztBQUNBLGFBQWEsZ0VBQWlCO0FBQzlCLHlEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvQVBJL2dldF9jb3VudHJ5X25hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvQVBJL2dldF9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL0FQSS9nZXRfbGF0X2FuZF9sb25fZnJvbV9jaXR5X25hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29yZS9nZXRfZGF0YV9ieV9jaXR5X25hbWUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdWkvbG9hZF9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VpL3BhZ2VfbG9hZC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91dGlscy9ldmVudF9iaW5kLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzL2dldF9lbGVtZW50X2J5X2lkLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzL3VuaXRzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldF9jb3VudHJ5X25hbWUoY291bnRyeV9jb2RlKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY291bnRyeSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vcmVzdGNvdW50cmllcy5jb20vdjIvYWxwaGEvJHtjb3VudHJ5X2NvZGV9YFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgY291bnRyeS5qc29uKCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG4iLCJpbXBvcnQgYXBpX2tleSBmcm9tIFwiLi9hcGkta2V5Lmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0X2RhdGEoeyBsb24sIGxhdCwgdW5pdCB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHthcGlfa2V5Lm9wZW5XZWF0aGVyQVBJS2V5fSZ1bml0cz0ke3VuaXR9YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyX2RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIHdlYXRoZXJfZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG4iLCJpbXBvcnQgYXBpX2tleSBmcm9tIFwiLi9hcGkta2V5Lmpzb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0X2xhdF9hbmRfbG9uX2Zyb21fY2l0eV9uYW1lKGNpdHlfbmFtZSkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHlfbmFtZX0mYXBwaWQ9JHthcGlfa2V5Lm9wZW5XZWF0aGVyQVBJS2V5fWBcbiAgICApO1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBkYXRhWzBdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbn1cbiIsImltcG9ydCBnZXRfbGF0X2FuZF9sb25fZnJvbV9jaXR5X25hbWUgZnJvbSBcIi4uL0FQSS9nZXRfbGF0X2FuZF9sb25fZnJvbV9jaXR5X25hbWVcIjtcbmltcG9ydCBnZXRfZGF0YSBmcm9tIFwiLi4vQVBJL2dldF9kYXRhXCI7XG5pbXBvcnQgZ2V0X2NvdW50cnlfbmFtZSBmcm9tIFwiLi4vQVBJL2dldF9jb3VudHJ5X25hbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0X2RhdGFfYnlfY2l0eV9uYW1lKGNpdHlfbmFtZSwgdW5pdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGNpdHkgPSBhd2FpdCBnZXRfbGF0X2FuZF9sb25fZnJvbV9jaXR5X25hbWUoY2l0eV9uYW1lKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldF9kYXRhKHtcbiAgICAgIGxvbjogY2l0eS5sb24sXG4gICAgICBsYXQ6IGNpdHkubGF0LFxuICAgICAgdW5pdDogdW5pdCxcbiAgICB9KTtcblxuICAgIGxldCBjb3VudHJ5O1xuICAgIGlmIChyZXNwb25zZS5zeXMuY291bnRyeSA9PT0gXCJHQlwiKSBjb3VudHJ5ID0geyBuYW1lOiBcIlVuaXRlZCBLaW5nZG9tXCIgfTtcbiAgICBlbHNlIHtcbiAgICAgIGNvdW50cnkgPSBhd2FpdCBnZXRfY291bnRyeV9uYW1lKHJlc3BvbnNlLnN5cy5jb3VudHJ5KTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgY3VycmVudF90ZW1wOiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICBmZWVsc19saWtlOiByZXNwb25zZS5tYWluLmZlZWxzX2xpa2UsXG4gICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgIHdpbmRfc3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICBjb3VudHJ5OiBjb3VudHJ5Lm5hbWUsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59XG4iLCJpbXBvcnQgZ2V0X2RhdGFfYnlfY2l0eV9uYW1lIGZyb20gXCIuLi9jb3JlL2dldF9kYXRhX2J5X2NpdHlfbmFtZVwiO1xuaW1wb3J0IGdldF9lbGVtZW50X2J5X2lkIGZyb20gXCIuLi91dGlscy9nZXRfZWxlbWVudF9ieV9pZFwiO1xuaW1wb3J0IHVuaXRzIGZyb20gXCIuLi91dGlscy91bml0c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBsb2FkX2RhdGEoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNpdHlfbmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICBjb25zdCB1bml0ID0gdW5pdHMuTUVUUklDLm5hbWU7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0X2RhdGFfYnlfY2l0eV9uYW1lKGNpdHlfbmFtZSwgdW5pdCk7XG5cbiAgICAgIC8vIERPTSBDYWNoZVxuICAgICAgY29uc3Qgd2VhdGhlcl9jb25kaXRpb25fZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcIndlYXRoZXItY29uZGl0aW9uXCIpO1xuICAgICAgY29uc3QgY2l0eV9maWVsZCA9IGdldF9lbGVtZW50X2J5X2lkKFwiY2l0eVwiKTtcbiAgICAgIGNvbnN0IGNvdW50cnlfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImNvdW50cnlcIik7XG4gICAgICBjb25zdCBjdXJyZW50X3RlbXBfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImN1cnJlbnRfdGVtcFwiKTtcbiAgICAgIGNvbnN0IGZlZWxzX2xpa2VfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImZlZWxzX2xpa2VcIik7XG4gICAgICBjb25zdCB3aW5kX2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJ3aW5kXCIpO1xuICAgICAgY29uc3QgaHVtaWRpdHlfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImh1bWlkaXR5XCIpO1xuXG4gICAgICB3ZWF0aGVyX2NvbmRpdGlvbl9maWVsZC50ZXh0Q29udGVudCA9IGRhdGEuc3RhdHVzO1xuICAgICAgY2l0eV9maWVsZC50ZXh0Q29udGVudCA9IGRhdGEuY2l0eS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY291bnRyeV9maWVsZC50ZXh0Q29udGVudCA9IGRhdGEuY291bnRyeS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY3VycmVudF90ZW1wX2ZpZWxkLmlubmVySFRNTCA9IGAke2RhdGEuY3VycmVudF90ZW1wfTxzdXA+PHN1cD4wPC9zdXA+JHtcbiAgICAgICAgdW5pdCA9PT0gdW5pdHMuSU1QRVJJQUwubmFtZVxuICAgICAgICAgID8gdW5pdHMuSU1QRVJJQUwudGVtcF9zeW1ib2xcbiAgICAgICAgICA6IHVuaXRzLk1FVFJJQy50ZW1wX3N5bWJvbFxuICAgICAgfTwvc3VwPmA7XG4gICAgICBmZWVsc19saWtlX2ZpZWxkLmlubmVySFRNTCA9IGAke2RhdGEuZmVlbHNfbGlrZX08c3VwPjxzdXA+MDwvc3VwPiR7XG4gICAgICAgIHVuaXQgPT09IHVuaXRzLklNUEVSSUFMLm5hbWVcbiAgICAgICAgICA/IHVuaXRzLklNUEVSSUFMLnRlbXBfc3ltYm9sXG4gICAgICAgICAgOiB1bml0cy5NRVRSSUMudGVtcF9zeW1ib2xcbiAgICAgIH08L3N1cD5gO1xuICAgICAgd2luZF9maWVsZC50ZXh0Q29udGVudCA9IGAke2RhdGEud2luZF9zcGVlZH0gJHtcbiAgICAgICAgdW5pdCA9PT0gdW5pdHMuSU1QRVJJQUwubmFtZVxuICAgICAgICAgID8gdW5pdHMuSU1QRVJJQUwuc3BlZWRfc3ltYm9sXG4gICAgICAgICAgOiB1bml0cy5NRVRSSUMuc3BlZWRfc3ltYm9sXG4gICAgICB9YDtcbiAgICAgIGh1bWlkaXR5X2ZpZWxkLnRleHRDb250ZW50ID0gYCR7ZGF0YS5odW1pZGl0eX0lYDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3aW5kb3cuYWxlcnQoXCJFbnRlciBhZ2FpblwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGdldF9kYXRhX2J5X2NpdHlfbmFtZSBmcm9tIFwiLi4vY29yZS9nZXRfZGF0YV9ieV9jaXR5X25hbWVcIjtcbmltcG9ydCBldmVudF9iaW5kIGZyb20gXCIuLi91dGlscy9ldmVudF9iaW5kXCI7XG5pbXBvcnQgZ2V0X2VsZW1lbnRfYnlfaWQgZnJvbSBcIi4uL3V0aWxzL2dldF9lbGVtZW50X2J5X2lkXCI7XG5pbXBvcnQgdW5pdHMgZnJvbSBcIi4uL3V0aWxzL3VuaXRzXCI7XG5pbXBvcnQgbG9hZF9kYXRhIGZyb20gXCIuL2xvYWRfZGF0YVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBwYWdlX2xvYWQoY2l0eV9uYW1lLCB1bml0KSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRfZGF0YV9ieV9jaXR5X25hbWUoY2l0eV9uYW1lLCB1bml0KTtcblxuICAvLyBET00gQ2FjaGVcbiAgY29uc3Qgd2VhdGhlcl9jb25kaXRpb25fZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcIndlYXRoZXItY29uZGl0aW9uXCIpO1xuICBjb25zdCBjaXR5X2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJjaXR5XCIpO1xuICBjb25zdCBjb3VudHJ5X2ZpZWxkID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJjb3VudHJ5XCIpO1xuICBjb25zdCBjdXJyZW50X3RlbXBfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImN1cnJlbnRfdGVtcFwiKTtcbiAgY29uc3QgZmVlbHNfbGlrZV9maWVsZCA9IGdldF9lbGVtZW50X2J5X2lkKFwiZmVlbHNfbGlrZVwiKTtcbiAgY29uc3Qgd2luZF9maWVsZCA9IGdldF9lbGVtZW50X2J5X2lkKFwid2luZFwiKTtcbiAgY29uc3QgaHVtaWRpdHlfZmllbGQgPSBnZXRfZWxlbWVudF9ieV9pZChcImh1bWlkaXR5XCIpO1xuXG4gIGNvbnN0IHNlYXJjaF9jaXR5X2lucHV0ID0gZ2V0X2VsZW1lbnRfYnlfaWQoXCJjaXR5X3NlYXJjaFwiKTtcblxuICB3ZWF0aGVyX2NvbmRpdGlvbl9maWVsZC50ZXh0Q29udGVudCA9IGRhdGEuc3RhdHVzO1xuICBjaXR5X2ZpZWxkLnRleHRDb250ZW50ID0gZGF0YS5jaXR5LnRvVXBwZXJDYXNlKCk7XG4gIGNvdW50cnlfZmllbGQudGV4dENvbnRlbnQgPSBkYXRhLmNvdW50cnkudG9VcHBlckNhc2UoKTtcbiAgY3VycmVudF90ZW1wX2ZpZWxkLmlubmVySFRNTCA9IGAke2RhdGEuY3VycmVudF90ZW1wfTxzdXA+PHN1cD4wPC9zdXA+JHtcbiAgICB1bml0ID09PSB1bml0cy5JTVBFUklBTC5uYW1lXG4gICAgICA/IHVuaXRzLklNUEVSSUFMLnRlbXBfc3ltYm9sXG4gICAgICA6IHVuaXRzLk1FVFJJQy50ZW1wX3N5bWJvbFxuICB9PC9zdXA+YDtcbiAgZmVlbHNfbGlrZV9maWVsZC5pbm5lckhUTUwgPSBgJHtkYXRhLmZlZWxzX2xpa2V9PHN1cD48c3VwPjA8L3N1cD4ke1xuICAgIHVuaXQgPT09IHVuaXRzLklNUEVSSUFMLm5hbWVcbiAgICAgID8gdW5pdHMuSU1QRVJJQUwudGVtcF9zeW1ib2xcbiAgICAgIDogdW5pdHMuTUVUUklDLnRlbXBfc3ltYm9sXG4gIH08L3N1cD5gO1xuICB3aW5kX2ZpZWxkLnRleHRDb250ZW50ID0gYCR7ZGF0YS53aW5kX3NwZWVkfSAke1xuICAgIHVuaXQgPT09IHVuaXRzLklNUEVSSUFMLm5hbWVcbiAgICAgID8gdW5pdHMuSU1QRVJJQUwuc3BlZWRfc3ltYm9sXG4gICAgICA6IHVuaXRzLk1FVFJJQy5zcGVlZF9zeW1ib2xcbiAgfWA7XG4gIGh1bWlkaXR5X2ZpZWxkLnRleHRDb250ZW50ID0gYCR7ZGF0YS5odW1pZGl0eX0lYDtcblxuICBldmVudF9iaW5kKHtcbiAgICBldmVudDogXCJrZXlkb3duXCIsXG4gICAgZm46IGxvYWRfZGF0YSxcbiAgICBlbGVtZW50OiBzZWFyY2hfY2l0eV9pbnB1dCxcbiAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBldmVudF9iaW5kKHsgZXZlbnQsIGZuLCBlbGVtZW50IH0pIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE5vZGVMaXN0KSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGVsZW1lbnQuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRfZWxlbWVudF9ieV9pZChpZCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuIiwiY29uc3QgdW5pdHMgPSB7XG4gIElNUEVSSUFMOiB7XG4gICAgbmFtZTogXCJpbXBlcmlhbFwiLFxuICAgIHRlbXBfc3ltYm9sOiBcIkZcIixcbiAgICBzcGVlZF9zeW1ib2w6IFwiTVBIXCIsXG4gIH0sXG4gIE1FVFJJQzoge1xuICAgIG5hbWU6IFwibWV0cmljXCIsXG4gICAgdGVtcF9zeW1ib2w6IFwiQ1wiLFxuICAgIHNwZWVkX3N5bWJvbDogXCJLTVBIXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB1bml0cztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBhZ2VfbG9hZCBmcm9tIFwiLi91aS9wYWdlX2xvYWRcIjtcbmltcG9ydCB1bml0cyBmcm9tIFwiLi91dGlscy91bml0c1wiO1xuXG5jb25zdCBjaXR5X25hbWUgPSBcInBhbmFkdXJhXCI7XG5jb25zdCB1bml0ID0gdW5pdHMuTUVUUklDLm5hbWU7XG5wYWdlX2xvYWQoY2l0eV9uYW1lLCB1bml0KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==