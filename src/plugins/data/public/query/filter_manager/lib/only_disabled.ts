/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { filter } from 'lodash';
import { esFilters } from '../../../../common';
import { compareFilters, COMPARE_ALL_OPTIONS } from './compare_filters';

const isEnabled = (f: esFilters.Filter) => f && f.meta && !f.meta.disabled;

/**
 * Checks to see if only disabled filters have been changed
 *
 * @returns {bool} Only disabled filters
 */
export const onlyDisabledFiltersChanged = (
  newFilters?: esFilters.Filter[],
  oldFilters?: esFilters.Filter[]
) => {
  // If it's the same - compare only enabled filters
  const newEnabledFilters = filter(newFilters || [], isEnabled);
  const oldEnabledFilters = filter(oldFilters || [], isEnabled);

  return compareFilters(oldEnabledFilters, newEnabledFilters, COMPARE_ALL_OPTIONS);
};