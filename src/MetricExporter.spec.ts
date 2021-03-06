/*
	Copyright 2020 Dynatrace LLC

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

import { DynatraceMetricExporter } from ".";

describe("MetricExporter", () => {
	test("should default to oneagent endpoint", () => {
		const exporter = new DynatraceMetricExporter();
		expect(exporter["_reqOpts"].hostname).toEqual("127.0.0.1");
		expect(exporter["_reqOpts"].port).toEqual("14499");
		expect(exporter["_reqOpts"].path).toEqual("/metrics/ingest");
	});

	test("should have a configurable url", () => {
		let exporter = new DynatraceMetricExporter({
			url: "https://example.com:8443/metrics"
		});
		expect(exporter["_reqOpts"].hostname).toEqual("example.com");
		expect(exporter["_reqOpts"].port).toEqual("8443");
		expect(exporter["_reqOpts"].path).toEqual("/metrics");
		expect(exporter["_reqOpts"].protocol).toEqual("https:");

		exporter = new DynatraceMetricExporter({
			url: "http://example.com:8080/metrics"
		});
		expect(exporter["_reqOpts"].hostname).toEqual("example.com");
		expect(exporter["_reqOpts"].port).toEqual("8080");
		expect(exporter["_reqOpts"].path).toEqual("/metrics");
		expect(exporter["_reqOpts"].protocol).toEqual("http:");
	});
});
