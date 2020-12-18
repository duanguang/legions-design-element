/*
 * @Author: duanguang
 * @Date: 2020-12-17 13:45:59
 * @LastEditTime: 2020-12-17 17:24:48
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsWaterDropBall/liquidFillView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import echarts from 'echarts/lib/echarts';
import { createSymbol } from 'echarts/lib/util/symbol';
import { liquidFillLayout } from './liquidFillLayout';
const numberUtil = echarts['number'];
const parsePercent = numberUtil.parsePercent;

function getShallow(model, path) {
  return model && model.getShallow(path);
}
export function liquidFillView() {
   echarts['extendChartView']({
    type: 'liquidFill',
    dispose: function () {
        // dispose nothing here
    },
    render: function (seriesModel, ecModel, api) {
      const group = this.group;
      group.removeAll();
      const data = seriesModel.getData();

      const itemModel = data.getItemModel(0);

      const center = itemModel.get('center');
      let radius = itemModel.get('radius');

      const width = api.getWidth();
      const height = api.getHeight();
      const size = Math.min(width, height);
      // itemStyle
      let outlineDistance = 0;
      let outlineBorderWidth = 0;
      const showOutline = seriesModel.get('outline.show');

      if (showOutline) {
        outlineDistance = seriesModel.get('outline.borderDistance');
        outlineBorderWidth = parsePercent(
          seriesModel.get('outline.itemStyle.borderWidth'),
          size
        );
      }
      let cx = parsePercent(center[0], width);
      let cy = parsePercent(center[1], height);

      let outterRadius;
      let innerRadius;
      let paddingRadius;

      let isFillContainer = false;

      let symbol = seriesModel.get('shape');

      if (symbol === 'container') {
        // a shape that fully fills the container
        isFillContainer = true;

        outterRadius = [width / 2, height / 2];
        innerRadius = [
          outterRadius[0] - outlineBorderWidth / 2,
          outterRadius[1] - outlineBorderWidth / 2,
        ];
        paddingRadius = [
          parsePercent(outlineDistance, width),
          parsePercent(outlineDistance, height),
        ];

        radius = [
          Math.max(innerRadius[0] - paddingRadius[0], 0),
          Math.max(innerRadius[1] - paddingRadius[1], 0),
        ];
      } else {
        outterRadius = parsePercent(radius, size) / 2;
        innerRadius = outterRadius - outlineBorderWidth / 2;
        paddingRadius = parsePercent(outlineDistance, size);

        radius = Math.max(innerRadius - paddingRadius, 0);
      }
      if (showOutline) {
        let outline = getOutline();
        outline.style.lineWidth = outlineBorderWidth;
        group.add(getOutline());
      }
      let left = isFillContainer ? 0 : cx - radius;
      let top = isFillContainer ? 0 : cy - radius;

      let wavePath = null;

      group.add(getBackground());
      // each data item for a wave
      let oldData = this._data;
      let waves = [];
      data
        .diff(oldData)
          .add(function (idx) {
            //@ts-ignore
          let wave = getWave(idx, false);

          let waterLevel = wave.shape.waterLevel;
          wave.shape.waterLevel = isFillContainer ? height / 2 : radius;
          echarts.graphic['initProps'](
            wave,
            {
              shape: {
                waterLevel: waterLevel,
              },
            },
            seriesModel
          );

          wave.z2 = 2;
          setWaveAnimation(idx, wave, null);

          group.add(wave);
            data.setItemGraphicEl(idx,wave);
            //@ts-ignore
          waves.push(wave);
        })
        .update(function (newIdx, oldIdx) {
          let waveElement = oldData.getItemGraphicEl(oldIdx);

          // new wave is used to calculate position, but not added
          let newWave = getWave(newIdx, false, waveElement);

          // changes with animation
          let shape = {};
          let shapeAttrs = [
            'amplitude',
            'cx',
            'cy',
            'phase',
            'radius',
            'radiusY',
            'waterLevel',
            'waveLength',
          ];
          for (let i = 0; i < shapeAttrs.length; ++i) {
            let attr = shapeAttrs[i];
            if (newWave.shape.hasOwnProperty(attr)) {
              shape[attr] = newWave.shape[attr];
            }
          }

          let style = {};
          let styleAttrs = ['fill', 'opacity', 'shadowBlur', 'shadowColor'];
          for (let i = 0; i < styleAttrs.length; ++i) {
            let attr = styleAttrs[i];
            if (newWave.style.hasOwnProperty(attr)) {
              style[attr] = newWave.style[attr];
            }
          }
          if (isFillContainer) {
            shape['radiusY'] = height / 2;
          }

          // changes with animation
          echarts.graphic['updateProps'](
            waveElement,
            {
              shape: shape,
            },
            seriesModel
          );

          waveElement.useStyle(style);

          // instant changes
          waveElement.position = newWave.position;
          waveElement.setClipPath(newWave.clipPath);
          waveElement.shape.inverse = newWave.inverse;

          setWaveAnimation(newIdx, waveElement, waveElement);
          group.add(waveElement);
            data.setItemGraphicEl(newIdx,waveElement);
            //@ts-ignore
          waves.push(waveElement);
        })
        .remove(function (idx) {
          let wave = oldData.getItemGraphicEl(idx);
          group.remove(wave);
        })
        .execute();

      if (itemModel.get('label.show')) {
        group.add(getText(waves));
      }

        this._data = data;
        /**
         * Get path for outline, background and clipping
         *
         * @param {number} r outter radius of shape
         * @param {boolean|undefined} isForClipping if the shape is used
         *                                          for clipping
         */
        function getPath(r, isForClipping) {
            if (symbol) {
                // customed symbol path
                if (symbol.indexOf('path://') === 0) {
                    let path = echarts.graphic['makePath'](symbol.slice(7), {});
                    let bouding = path.getBoundingRect();
                    let w = bouding.width;
                    let h = bouding.height;
                    if (w > h) {
                        h = r * 2 / w * h;
                        w = r * 2;
                    }
                    else {
                        w = r * 2 / h * w;
                        h = r * 2;
                    }

                    let left = isForClipping ? 0 : cx - w / 2;
                    let top = isForClipping ? 0 : cy - h / 2;
                    path = echarts.graphic['makePath'](
                        symbol.slice(7),
                        {},
                        new echarts.graphic['BoundingRect'](left, top, w, h)
                    );
                    if (isForClipping) {
                        path.position = [-w / 2, -h / 2];
                    }
                    return path;
                }
                else if (isFillContainer) {
                    // fully fill the container
                    let x = isForClipping ? -r[0] : cx - r[0];
                    let y = isForClipping ? -r[1] : cy - r[1];
                    return createSymbol(
                        'rect', x, y, r[0] * 2, r[1] * 2
                    );
                }
                else {
                    let x = isForClipping ? -r : cx - r;
                    let y = isForClipping ? -r : cy - r;
                    if (symbol === 'pin') {
                        y += r;
                    }
                    else if (symbol === 'arrow') {
                        y -= r;
                    }
                    return createSymbol(symbol, x, y, r * 2, r * 2);
                }
            }

            return new echarts.graphic['Circle']({
                shape: {
                    cx: isForClipping ? 0 : cx,
                    cy: isForClipping ? 0 : cy,
                    r: r
                }
            });
        }

        /**
         * Create outline
         */
        function getOutline() {
            //@ts-ignore
            let outlinePath = getPath(outterRadius);
            outlinePath.style.fill = null;

            outlinePath.setStyle(seriesModel.getModel('outline.itemStyle')
                .getItemStyle());

            return outlinePath;
        }
        /**
         * Create background
         */
        function getBackground() {
            // Seperate stroke and fill, so we can use stroke to cover the alias of clipping.
            //@ts-ignore
            let strokePath = getPath(radius);
            strokePath.setStyle(seriesModel.getModel('backgroundStyle')
                .getItemStyle());
            strokePath.style.fill = null;

            // Stroke is front of wave
            strokePath.z2 = 5;

            //@ts-ignore
            let fillPath = getPath(radius);
            fillPath.setStyle(seriesModel.getModel('backgroundStyle')
                .getItemStyle());
            fillPath.style.stroke = null;

            let group = new echarts.graphic['Group']();
            group.add(strokePath);
            group.add(fillPath);

            return group;
        }
         
        /**
         * wave shape
         */
        function getWave(idx, isInverse, oldWave) {
            let radiusX = isFillContainer ? radius[0] : radius;
            let radiusY = isFillContainer ? height / 2 : radius;

            let itemModel = data.getItemModel(idx);
            let itemStyleModel = itemModel.getModel('itemStyle');
            let phase = itemModel.get('phase');
            let amplitude = parsePercent(itemModel.get('amplitude'),
                radiusY * 2);
            let waveLength = parsePercent(itemModel.get('waveLength'),
                radiusX * 2);

            let value = data.get('value', idx);
            let waterLevel = radiusY - value * radiusY * 2;
            phase = oldWave ? oldWave.shape.phase
                : (phase === 'auto' ? idx * Math.PI / 4 : phase);
            let normalStyle = itemStyleModel.getItemStyle();
            if (!normalStyle.fill) {
                let seriesColor = seriesModel.get('color');
                let id = idx % seriesColor.length;
                normalStyle.fill = seriesColor[id];
            }

            let x = radiusX * 2;
            let wave =liquidFillLayout({
                shape: {
                    waveLength: waveLength,
                    radius: radiusX,
                    radiusY: radiusY,
                    cx: x,
                    cy: 0,
                    waterLevel: waterLevel,
                    amplitude: amplitude,
                    phase: phase,
                    inverse: isInverse
                },
                style: normalStyle,
                position: [cx, cy]
            });
            wave.shape._waterLevel = waterLevel;

            let hoverStyle = itemModel.getModel('emphasis.itemStyle')
                .getItemStyle();
            hoverStyle.lineWidth = 0;
            echarts.graphic['setHoverStyle'](wave, hoverStyle);

            // clip out the part outside the circle
            let clip = getPath(radius, true);
            // set fill for clipPath, otherwise it will not trigger hover event
            clip.setStyle({
                fill: 'white'
            });
            wave.setClipPath(clip);

            return wave;
        }
        function setWaveAnimation(idx, wave, oldWave) {
            let itemModel = data.getItemModel(idx);

            let maxSpeed = itemModel.get('period');
            let direction = itemModel.get('direction');

            let value = data.get('value', idx);

            let phase = itemModel.get('phase');
            phase = oldWave ? oldWave.shape.phase
                : (phase === 'auto' ? idx * Math.PI / 4 : phase);

            let defaultSpeed = function (maxSpeed) {
                let cnt = data.count();
                return cnt === 0 ? maxSpeed : maxSpeed *
                    (0.2 + (cnt - idx) / cnt * 0.8);
            };
            let speed = 0;
            if (maxSpeed === 'auto') {
                speed = defaultSpeed(5000);
            }
            else {
                speed = typeof maxSpeed === 'function'
                    ? maxSpeed(value, idx) : maxSpeed;
            }

            // phase for moving left/right
            let phaseOffset = 0;
            if (direction === 'right' || direction == null) {
                phaseOffset = Math.PI;
            }
            else if (direction === 'left') {
                phaseOffset = -Math.PI;
            }
            else if (direction === 'none') {
                phaseOffset = 0;
            }
            else {
                console.error('Illegal direction value for liquid fill.');
            }

            // wave animation of moving left/right
            if (direction !== 'none' && itemModel.get('waveAnimation')) {
                wave
                    .animate('shape', true)
                    .when(0, {
                        phase: phase
                    })
                    .when(speed / 2, {
                        phase: phaseOffset + phase
                    })
                    .when(speed, {
                        phase: phaseOffset * 2 + phase
                    })
                    .during(function () {
                        if (wavePath) {
                            //@ts-ignore
                            wavePath.dirty(true);
                        }
                    })
                    .start();
            }
        }

        /**
         * text on wave
         */
        function getText(waves) {
            let labelModel = itemModel.getModel('label');

            function formatLabel() {
                let formatted = seriesModel.getFormattedLabel(0, 'normal');
                let defaultVal = (data.get('value', 0) * 100);
                let defaultLabel = data.getName(0) || seriesModel.name;
                if (!isNaN(defaultVal)) {
                    defaultLabel = defaultVal.toFixed(0) + '%';
                }
                return formatted == null ? defaultLabel : formatted;
            }

            let textOption = {
                z2: 10,
                shape: {
                    x: left,
                    y: top,
                    width: (isFillContainer ? radius[0] : radius) * 2,
                    height: (isFillContainer ? radius[1] : radius) * 2
                },
                style: {
                    fill: 'transparent',
                    text: formatLabel(),
                    textAlign: labelModel.get('align'),
                    textVerticalAlign: labelModel.get('baseline')
                },
                silent: true
            };

            let outsideTextRect = new echarts.graphic['Rect'](textOption);
            let color = labelModel.get('color');
            echarts.graphic['setText'](outsideTextRect.style, labelModel, color);

            let insideTextRect = new echarts.graphic['Rect'](textOption);
            let insColor = labelModel.get('insideColor');
            echarts.graphic['setText'](insideTextRect.style, labelModel, insColor);
            insideTextRect.style.textFill = insColor;

            let group = new echarts.graphic['Group']();
            group.add(outsideTextRect);
            group.add(insideTextRect);

            // clip out waves for insideText
            let boundingCircle = getPath(radius, true);

            wavePath = new echarts.graphic['CompoundPath']({
                shape: {
                    paths: waves
                },
                position: [cx, cy]
            });

            //@ts-ignore
            wavePath.setClipPath(boundingCircle);
            insideTextRect.setClipPath(wavePath);

            return group;
        }
    },
  });
}
