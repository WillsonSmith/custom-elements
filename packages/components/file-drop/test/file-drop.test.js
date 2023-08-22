/* eslint-disable */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import '../file-drop.js';

describe('file-drop', () => {
  describe('Events', () => {
    it('fires drag-enter event', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);
      const listener = oneEvent(el, 'file-drop');

      el.dispatchEvent(new Event('dragenter'));

      const { detail } = await listener;

      expect(detail.type).to.equal('drag-enter');
    });

    it('fires drag-over event', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);

      const listener = oneEvent(el, 'file-drop');
      el.dispatchEvent(new Event('dragover'));
      const { detail } = await listener;

      expect(detail.type).to.equal('drag-over');
    });

    it('fires drag-leave event', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);
      const listener = oneEvent(el, 'file-drop');

      el.dispatchEvent(new Event('dragleave'));

      const { detail } = await listener;
      expect(detail.type).to.equal('drag-leave');
    });

    it('fires drop event', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);
      const listener = oneEvent(el, 'file-drop');

      el.dispatchEvent(new Event('drop'));

      const { detail } = await listener;
      expect(detail.type).to.equal('drop');
    });
  });

  describe('Attributes', () => {
    it('sets drag-enter attribute', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);
      el.dispatchEvent(new Event('dragenter'));
      expect(el.getAttribute('drag-enter')).to.equal('drag-enter');
    });

    it('sets drag-over attribute', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);
      el.dispatchEvent(new Event('dragover'));
      expect(el.getAttribute('drag-over')).to.equal('drag-over');
    });

    it('sets drag-leave attribute', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);

      el.dispatchEvent(new Event('dragenter'));
      el.dispatchEvent(new Event('dragover'));

      el.dispatchEvent(new Event('dragleave'));

      expect(el.getAttribute('drag-leave')).to.equal('drag-leave');
      expect(el.getAttribute('drag-enter')).to.equal(null);
      expect(el.getAttribute('drag-over')).to.equal(null);
    });

    it('sets drop attribute', async () => {
      const el = await fixture(html`<file-drop></file-drop>`);

      el.dispatchEvent(new Event('dragenter'));
      el.dispatchEvent(new Event('dragover'));
      el.dispatchEvent(new Event('drop'));

      expect(el.getAttribute('drag-enter')).to.equal(null);
      expect(el.getAttribute('drag-over')).to.equal(null);
    });
  });
});
