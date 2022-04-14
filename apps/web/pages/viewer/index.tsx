import React, { useEffect } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { hideLoadingScreen, setUnityLoaded, setUnityContext } from './store';

import type { NextPage } from 'next';

const Viewer: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  //#region Selectors
  const dispatch = useAppDispatch();
  const showLoadingScreen = useAppSelector(
    (state) => state.viewer.showLoadingScreen
  );
  const unityLoaded = useAppSelector((state) => state.viewer.unityLoaded);
  //#endregion

  //#region Initialization
  const unityContext = useAppSelector((state) => state.viewer.unityContext);

  useEffect(() => {
    const unityContext = new UnityContext({
      loaderUrl: 'builds/Build/painter.loader.js',
      dataUrl: 'builds/Build/painter.data',
      frameworkUrl: 'builds/Build/painter.framework.js',
      codeUrl: 'builds/Build/painter.wasm',
      webglContextAttributes: {
        alpha: true,
        antialias: true,
        depth: true,
        failIfMajorPerformanceCaveat: true,
        powerPreference: 'high-performance',
        premultipliedAlpha: true,
        preserveDrawingBuffer: true,
        stencil: true,
        desynchronized: true,
        xrCompatible: true,
      },
    });
    if (unityContext) {
      dispatch(setUnityContext(unityContext));
    }
  }, [dispatch]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendIsUnityReady', async () => {
        if (cid) {
          const res = await fetch(
            `https://${cid}.ipfs.nftstorage.link/metadata.txt`
          );
          const metadata = await res.text();
          unityContext.send('Redirection', 'StartPreview', metadata);

          dispatch(hideLoadingScreen());
          dispatch(setUnityLoaded());
        }
      });
    }
  }, [unityContext, cid, dispatch]);

  //#endregion

  return (
    <>
      {showLoadingScreen && (
        <div className="absolute bg-black-700 h-screen w-screen z-[999]">
          <div className="grid place-content-center h-full w-full">
            <div className="flex items-baseline">
              <p className="font-extrabold text-4xl text-white animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        </div>
      )}

      {unityContext && (
        <>
          <Unity
            className="hover:!cursor-move"
            unityContext={unityContext}
            style={{
              width: '400px',
              height: '600px',
            }}
          />
        </>
      )}
    </>
  );
};

export default Viewer;
